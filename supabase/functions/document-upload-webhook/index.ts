
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface WebhookPayload {
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  processes: string[];
  uploadedBy: string;
  fileName: string;
  fileSize: number;
  fileUrl: string;
}

const serve = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { record } = await req.json();
    console.log('Document upload webhook triggered:', record);

    // Buscar dados do cliente
    const { data: client, error: clientError } = await supabase
      .from('clients')
      .select('name, phone, email')
      .eq('id', record.client_id)
      .single();

    if (clientError) {
      console.error('Error fetching client:', clientError);
      throw clientError;
    }

    // Buscar processos do cliente
    const { data: processes, error: processError } = await supabase
      .from('client_processes')
      .select('process_number')
      .eq('client_id', record.client_id);

    if (processError) {
      console.error('Error fetching processes:', processError);
      throw processError;
    }

    // Gerar URL pública do arquivo
    const { data: urlData } = supabase.storage
      .from('client-documents')
      .getPublicUrl(record.file_path);

    const fileUrl = urlData.publicUrl;

    // Preparar payload do webhook
    const webhookPayload: WebhookPayload = {
      clientName: client.name,
      clientPhone: client.phone,
      clientEmail: client.email,
      processes: processes?.map(p => p.process_number) || [],
      uploadedBy: record.uploaded_by_admin ? 'Advogado' : 'Cliente',
      fileName: record.file_name,
      fileSize: record.file_size,
      fileUrl: fileUrl
    };

    // Determinar qual webhook usar baseado em quem fez o upload
    const webhookUrl = record.uploaded_by_admin 
      ? 'https://webhook.zapelegante.com.br/webhook/77817f85-7fc8-4476-9f03-4ede2867803a' // Advogado
      : 'https://webhook.zapelegante.com.br/webhook/36ea66b8-bbdb-49f8-999e-4cf6de245a1e'; // Cliente

    console.log('Sending webhook to:', webhookUrl);
    console.log('Payload:', webhookPayload);

    // Enviar webhook
    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookPayload),
    });

    if (!webhookResponse.ok) {
      console.error('Webhook failed:', webhookResponse.status, await webhookResponse.text());
      throw new Error(`Webhook failed with status: ${webhookResponse.status}`);
    }

    console.log('Webhook sent successfully');

    return new Response(
      JSON.stringify({ success: true, message: 'Webhook sent successfully' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );

  } catch (error) {
    console.error('Error in document-upload-webhook:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(serve);
