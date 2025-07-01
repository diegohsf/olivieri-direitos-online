
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const processData = await req.json();
    console.log('Received process data:', processData);

    // Tentar extrair o número do processo de diferentes formas
    let processNumber = null;
    
    // Verificar se existe response_data.code (caso dos dados que você está enviando)
    if (processData.payload?.response_data?.code) {
      processNumber = processData.payload.response_data.code;
    }
    // Verificar campos alternativos
    else if (processData.process_number) {
      processNumber = processData.process_number;
    }
    else if (processData.numero_processo) {
      processNumber = processData.numero_processo;
    }
    else if (processData.code) {
      processNumber = processData.code;
    }
    
    if (!processNumber) {
      console.error('Process number not found in payload:', JSON.stringify(processData, null, 2));
      return new Response('Process number is required', { 
        status: 400, 
        headers: corsHeaders 
      });
    }

    console.log('Extracted process number:', processNumber);

    // Check if process already exists in process_consultations
    const { data: existingProcess } = await supabase
      .from('process_consultations')
      .select('*')
      .eq('numero_processo', processNumber)
      .single();

    // Preparar dados para salvar seguindo a estrutura de process_consultations
    const dataToStore = {
      numero_processo: processNumber,
      data: processData, // Salvar o objeto completo no campo data (jsonb)
      status: 'completed', // Marcar como completed já que recebemos os dados
      updated_at: new Date().toISOString()
    };

    if (existingProcess) {
      // Update existing process
      const { error: updateError } = await supabase
        .from('process_consultations')
        .update(dataToStore)
        .eq('numero_processo', processNumber);

      if (updateError) {
        console.error('Error updating process:', updateError);
        return new Response('Error updating process', { 
          status: 500, 
          headers: corsHeaders 
        });
      }

      console.log('Process updated successfully in process_consultations:', processNumber);
    } else {
      // Insert new process
      const { error: insertError } = await supabase
        .from('process_consultations')
        .insert(dataToStore);

      if (insertError) {
        console.error('Error inserting process:', insertError);
        return new Response('Error inserting process', { 
          status: 500, 
          headers: corsHeaders 
        });
      }

      console.log('Process inserted successfully in process_consultations:', processNumber);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Process data received and stored successfully in process_consultations',
        process_number: processNumber
      }), 
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response('Internal server error', { 
      status: 500, 
      headers: corsHeaders 
    });
  }
});
