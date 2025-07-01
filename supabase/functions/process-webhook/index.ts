
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const body = await req.json();
    console.log('Webhook recebido:', body);

    const { process_number, case_data, movements } = body;

    if (!process_number) {
      return new Response(
        JSON.stringify({ error: 'process_number é obrigatório' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Buscar o cliente pelo número do processo
    const { data: client, error: clientError } = await supabase
      .from('clients')
      .select('id')
      .eq('process_number', process_number)
      .single();

    if (clientError || !client) {
      console.error('Cliente não encontrado:', clientError);
      return new Response(
        JSON.stringify({ error: 'Cliente não encontrado para este processo' }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Inserir ou atualizar os dados do processo
    const { error: upsertError } = await supabase
      .from('process_data')
      .upsert({
        process_number,
        client_id: client.id,
        case_data,
        movements,
        last_updated: new Date().toISOString()
      }, {
        onConflict: 'process_number'
      });

    if (upsertError) {
      console.error('Erro ao salvar dados do processo:', upsertError);
      return new Response(
        JSON.stringify({ error: 'Erro ao salvar dados do processo' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Atualizar status das solicitações pendentes
    const { error: updateError } = await supabase
      .from('process_update_requests')
      .update({ 
        status: 'completed',
        completed_at: new Date().toISOString()
      })
      .eq('client_id', client.id)
      .eq('status', 'pending');

    if (updateError) {
      console.error('Erro ao atualizar solicitações:', updateError);
    }

    console.log('Dados do processo atualizados com sucesso');

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Dados do processo atualizados com sucesso' 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Erro no webhook:', error);
    return new Response(
      JSON.stringify({ error: 'Erro interno do servidor' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
