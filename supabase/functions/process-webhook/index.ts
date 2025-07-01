
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

    const processNumber = processData.process_number || processData.numero_processo;
    
    if (!processNumber) {
      console.error('Process number is required');
      return new Response('Process number is required', { 
        status: 400, 
        headers: corsHeaders 
      });
    }

    // Check if process already exists
    const { data: existingProcess } = await supabase
      .from('process_data')
      .select('*')
      .eq('process_number', processNumber)
      .single();

    if (existingProcess) {
      // Update existing process
      const { error: updateError } = await supabase
        .from('process_data')
        .update({
          case_data: processData.case_data || processData,
          movements: processData.movements || processData.movimentacoes || [],
          last_updated: new Date().toISOString()
        })
        .eq('process_number', processNumber);

      if (updateError) {
        console.error('Error updating process:', updateError);
        return new Response('Error updating process', { 
          status: 500, 
          headers: corsHeaders 
        });
      }

      console.log('Process updated successfully:', processNumber);
    } else {
      // Insert new process
      const { error: insertError } = await supabase
        .from('process_data')
        .insert({
          process_number: processNumber,
          case_data: processData.case_data || processData,
          movements: processData.movements || processData.movimentacoes || [],
          last_updated: new Date().toISOString()
        });

      if (insertError) {
        console.error('Error inserting process:', insertError);
        return new Response('Error inserting process', { 
          status: 500, 
          headers: corsHeaders 
        });
      }

      console.log('Process inserted successfully:', processNumber);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Process data received and stored successfully',
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
