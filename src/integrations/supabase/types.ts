export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_settings: {
        Row: {
          created_at: string
          id: string
          setting_key: string
          setting_value: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          setting_key: string
          setting_value: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          setting_key?: string
          setting_value?: string
          updated_at?: string
        }
        Relationships: []
      }
      ai_messages: {
        Row: {
          created_at: string
          id: string
          is_active: boolean | null
          message_text: string
          used_count: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          message_text: string
          used_count?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          message_text?: string
          used_count?: number | null
        }
        Relationships: []
      }
      backend_instances: {
        Row: {
          created_at: string
          id: string
          instance_name: string
          last_message_sent: string | null
          phone_number: string
          status: string
          target_index: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          instance_name: string
          last_message_sent?: string | null
          phone_number: string
          status?: string
          target_index?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          instance_name?: string
          last_message_sent?: string | null
          phone_number?: string
          status?: string
          target_index?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      captured_contacts: {
        Row: {
          created_at: string
          id: string
          instance_id: string
          metadata: Json | null
          name: string | null
          phone_number: string
          profile_picture_url: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          instance_id: string
          metadata?: Json | null
          name?: string | null
          phone_number: string
          profile_picture_url?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          instance_id?: string
          metadata?: Json | null
          name?: string | null
          phone_number?: string
          profile_picture_url?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          conversation_id: string
          created_at: string
          id: string
          message_text: string
          read_at: string | null
          sender_id: string
          sender_type: string
        }
        Insert: {
          conversation_id: string
          created_at?: string
          id?: string
          message_text: string
          read_at?: string | null
          sender_id: string
          sender_type: string
        }
        Update: {
          conversation_id?: string
          created_at?: string
          id?: string
          message_text?: string
          read_at?: string | null
          sender_id?: string
          sender_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      client_documents: {
        Row: {
          client_id: string
          created_at: string
          description: string | null
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id: string
          updated_at: string
          uploaded_by_admin: boolean
        }
        Insert: {
          client_id: string
          created_at?: string
          description?: string | null
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id?: string
          updated_at?: string
          uploaded_by_admin?: boolean
        }
        Update: {
          client_id?: string
          created_at?: string
          description?: string | null
          file_name?: string
          file_path?: string
          file_size?: number
          file_type?: string
          id?: string
          updated_at?: string
          uploaded_by_admin?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "client_documents_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      client_processes: {
        Row: {
          client_id: string
          created_at: string
          id: string
          process_number: string
          updated_at: string
        }
        Insert: {
          client_id: string
          created_at?: string
          id?: string
          process_number: string
          updated_at?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          id?: string
          process_number?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_processes_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          password_hash: string
          phone: string
          process_number: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          password_hash: string
          phone: string
          process_number: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          password_hash?: string
          phone?: string
          process_number?: string
          updated_at?: string
        }
        Relationships: []
      }
      connected_warming_users: {
        Row: {
          connected_at: string
          full_jid: string
          id: string
          instance_id: string
          last_message_sent: string | null
          phone_number: string
          status: string
          target_index: number | null
        }
        Insert: {
          connected_at?: string
          full_jid: string
          id?: string
          instance_id: string
          last_message_sent?: string | null
          phone_number: string
          status?: string
          target_index?: number | null
        }
        Update: {
          connected_at?: string
          full_jid?: string
          id?: string
          instance_id?: string
          last_message_sent?: string | null
          phone_number?: string
          status?: string
          target_index?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "connected_warming_users_instance_id_fkey"
            columns: ["instance_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_warming_instances"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_downloads: {
        Row: {
          created_at: string
          file_content: string
          filename: string
          id: string
          instance_id: string
          total_contacts: number
        }
        Insert: {
          created_at?: string
          file_content: string
          filename: string
          id?: string
          instance_id: string
          total_contacts?: number
        }
        Update: {
          created_at?: string
          file_content?: string
          filename?: string
          id?: string
          instance_id?: string
          total_contacts?: number
        }
        Relationships: []
      }
      conversations: {
        Row: {
          client_id: string
          created_at: string
          id: string
          last_message_at: string | null
          updated_at: string
        }
        Insert: {
          client_id: string
          created_at?: string
          id?: string
          last_message_at?: string | null
          updated_at?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          id?: string
          last_message_at?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      developers: {
        Row: {
          avatar: string
          created_at: string
          id: string
          name: string
          role: string
        }
        Insert: {
          avatar: string
          created_at?: string
          id?: string
          name: string
          role: string
        }
        Update: {
          avatar?: string
          created_at?: string
          id?: string
          name?: string
          role?: string
        }
        Relationships: []
      }
      documentos: {
        Row: {
          conteudo: string | null
          embedding: string | null
          id: string
        }
        Insert: {
          conteudo?: string | null
          embedding?: string | null
          id?: string
        }
        Update: {
          conteudo?: string | null
          embedding?: string | null
          id?: string
        }
        Relationships: []
      }
      kb_chunks: {
        Row: {
          content: string
          doc_id: string
          embedding: string
          id: number
        }
        Insert: {
          content: string
          doc_id: string
          embedding: string
          id?: number
        }
        Update: {
          content?: string
          doc_id?: string
          embedding?: string
          id?: number
        }
        Relationships: []
      }
      lawyer_registration_logs: {
        Row: {
          action: string
          created_at: string
          id: string
          performed_by: string
          reason: string | null
          registration_id: string
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          performed_by: string
          reason?: string | null
          registration_id: string
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          performed_by?: string
          reason?: string | null
          registration_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lawyer_registration_logs_registration_id_fkey"
            columns: ["registration_id"]
            isOneToOne: false
            referencedRelation: "lawyer_registrations"
            referencedColumns: ["id"]
          },
        ]
      }
      lawyer_registrations: {
        Row: {
          address: Json | null
          approved_at: string | null
          approved_by: string | null
          cpf: string | null
          created_at: string
          email: string
          holding_oab_photo_url: string
          id: string
          name: string
          oab_back_photo_url: string
          oab_front_photo_url: string
          oab_number: string
          oab_state: string
          phone: string | null
          rejected_at: string | null
          rejected_by: string | null
          rejection_reason: string | null
          status: string
          updated_at: string
        }
        Insert: {
          address?: Json | null
          approved_at?: string | null
          approved_by?: string | null
          cpf?: string | null
          created_at?: string
          email: string
          holding_oab_photo_url: string
          id?: string
          name: string
          oab_back_photo_url: string
          oab_front_photo_url: string
          oab_number: string
          oab_state: string
          phone?: string | null
          rejected_at?: string | null
          rejected_by?: string | null
          rejection_reason?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          address?: Json | null
          approved_at?: string | null
          approved_by?: string | null
          cpf?: string | null
          created_at?: string
          email?: string
          holding_oab_photo_url?: string
          id?: string
          name?: string
          oab_back_photo_url?: string
          oab_front_photo_url?: string
          oab_number?: string
          oab_state?: string
          phone?: string | null
          rejected_at?: string | null
          rejected_by?: string | null
          rejection_reason?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      message_logs: {
        Row: {
          campaign_id: string | null
          delivered_at: string | null
          error_message: string | null
          from_instance_id: string | null
          id: string
          message_text: string | null
          metadata: Json | null
          sent_at: string | null
          status: string | null
          to_instance_id: string | null
        }
        Insert: {
          campaign_id?: string | null
          delivered_at?: string | null
          error_message?: string | null
          from_instance_id?: string | null
          id?: string
          message_text?: string | null
          metadata?: Json | null
          sent_at?: string | null
          status?: string | null
          to_instance_id?: string | null
        }
        Update: {
          campaign_id?: string | null
          delivered_at?: string | null
          error_message?: string | null
          from_instance_id?: string | null
          id?: string
          message_text?: string | null
          metadata?: Json | null
          sent_at?: string | null
          status?: string | null
          to_instance_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "message_logs_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "warming_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_logs_from_instance_id_fkey"
            columns: ["from_instance_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_instances"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_logs_to_instance_id_fkey"
            columns: ["to_instance_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_instances"
            referencedColumns: ["id"]
          },
        ]
      }
      n8n_fila_mensagens: {
        Row: {
          id: number
          id_mensagem: string
          mensagem: string
          telefone: string
          timestamp: string
        }
        Insert: {
          id?: number
          id_mensagem: string
          mensagem: string
          telefone: string
          timestamp: string
        }
        Update: {
          id?: number
          id_mensagem?: string
          mensagem?: string
          telefone?: string
          timestamp?: string
        }
        Relationships: []
      }
      n8n_historico_mensagens: {
        Row: {
          created_at: string
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          created_at?: string
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          created_at: string
          customer_address: Json
          customer_name: string
          customer_phone: string
          delivery_fee: number | null
          discount_amount: number | null
          id: string
          items: Json
          notes: string | null
          order_status: string
          payment_method: string
          payment_status: string
          pix_correlation_id: string | null
          total_amount: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_address: Json
          customer_name: string
          customer_phone: string
          delivery_fee?: number | null
          discount_amount?: number | null
          id?: string
          items: Json
          notes?: string | null
          order_status?: string
          payment_method?: string
          payment_status?: string
          pix_correlation_id?: string | null
          total_amount: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_address?: Json
          customer_name?: string
          customer_phone?: string
          delivery_fee?: number | null
          discount_amount?: number | null
          id?: string
          items?: Json
          notes?: string | null
          order_status?: string
          payment_method?: string
          payment_status?: string
          pix_correlation_id?: string | null
          total_amount?: number
          updated_at?: string
        }
        Relationships: []
      }
      process_authorizations: {
        Row: {
          accepted_at: string | null
          client_email: string
          client_id: string
          client_name: string
          created_at: string | null
          id: string
          lawyer_email: string | null
          lawyer_id: string
          lawyer_name: string
          process_number: string
          rejected_at: string | null
          rejection_reason: string | null
          status: string
          token: string
          updated_at: string | null
        }
        Insert: {
          accepted_at?: string | null
          client_email: string
          client_id: string
          client_name: string
          created_at?: string | null
          id?: string
          lawyer_email?: string | null
          lawyer_id: string
          lawyer_name: string
          process_number: string
          rejected_at?: string | null
          rejection_reason?: string | null
          status?: string
          token?: string
          updated_at?: string | null
        }
        Update: {
          accepted_at?: string | null
          client_email?: string
          client_id?: string
          client_name?: string
          created_at?: string | null
          id?: string
          lawyer_email?: string | null
          lawyer_id?: string
          lawyer_name?: string
          process_number?: string
          rejected_at?: string | null
          rejection_reason?: string | null
          status?: string
          token?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      process_consultations: {
        Row: {
          created_at: string
          data: Json | null
          id: string
          numero_processo: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          data?: Json | null
          id?: string
          numero_processo: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          data?: Json | null
          id?: string
          numero_processo?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      process_data: {
        Row: {
          case_data: Json | null
          client_id: string | null
          created_at: string
          id: string
          last_updated: string
          movements: Json | null
          process_number: string
        }
        Insert: {
          case_data?: Json | null
          client_id?: string | null
          created_at?: string
          id?: string
          last_updated?: string
          movements?: Json | null
          process_number: string
        }
        Update: {
          case_data?: Json | null
          client_id?: string | null
          created_at?: string
          id?: string
          last_updated?: string
          movements?: Json | null
          process_number?: string
        }
        Relationships: [
          {
            foreignKeyName: "process_data_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      process_payments: {
        Row: {
          amount: number
          created_at: string
          id: string
          numero_processo: string
          payment_data: Json | null
          payment_id: string
          payment_method: string
          status: string
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          numero_processo: string
          payment_data?: Json | null
          payment_id: string
          payment_method: string
          status?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          numero_processo?: string
          payment_data?: Json | null
          payment_id?: string
          payment_method?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      process_update_requests: {
        Row: {
          client_id: string | null
          completed_at: string | null
          id: string
          process_number: string
          requested_at: string
          status: string
        }
        Insert: {
          client_id?: string | null
          completed_at?: string | null
          id?: string
          process_number: string
          requested_at?: string
          status?: string
        }
        Update: {
          client_id?: string | null
          completed_at?: string | null
          id?: string
          process_number?: string
          requested_at?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "process_update_requests_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category: string
          created_at: string
          description: string
          id: string
          image_emoji: string
          image_url: string | null
          is_active: boolean
          name: string
          price: number
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          id?: string
          image_emoji: string
          image_url?: string | null
          is_active?: boolean
          name: string
          price: number
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          id?: string
          image_emoji?: string
          image_url?: string | null
          is_active?: boolean
          name?: string
          price?: number
          updated_at?: string
        }
        Relationships: []
      }
      promotions: {
        Row: {
          created_at: string
          description: string
          id: string
          image_emoji: string
          image_url: string | null
          is_active: boolean
          original_price: number
          promotion_price: number
          time_left: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          image_emoji: string
          image_url?: string | null
          is_active?: boolean
          original_price: number
          promotion_price: number
          time_left: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          image_emoji?: string
          image_url?: string | null
          is_active?: boolean
          original_price?: number
          promotion_price?: number
          time_left?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      restaurant_settings: {
        Row: {
          created_at: string
          description: string
          id: string
          logo_url: string | null
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string
          id?: string
          logo_url?: string | null
          name?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          logo_url?: string | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      sprints: {
        Row: {
          created_at: string
          end_date: string
          id: string
          name: string
          start_date: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          end_date: string
          id?: string
          name: string
          start_date: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          end_date?: string
          id?: string
          name?: string
          start_date?: string
          updated_at?: string
        }
        Relationships: []
      }
      subtasks: {
        Row: {
          assignee_id: string | null
          completed_at: string | null
          created_at: string
          description: string | null
          development_hours: number
          due_date: string | null
          id: string
          parent_task_id: string
          priority: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          assignee_id?: string | null
          completed_at?: string | null
          created_at?: string
          description?: string | null
          development_hours?: number
          due_date?: string | null
          id?: string
          parent_task_id: string
          priority?: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          assignee_id?: string | null
          completed_at?: string | null
          created_at?: string
          description?: string | null
          development_hours?: number
          due_date?: string | null
          id?: string
          parent_task_id?: string
          priority?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "subtasks_assignee_id_fkey"
            columns: ["assignee_id"]
            isOneToOne: false
            referencedRelation: "developers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subtasks_parent_task_id_fkey"
            columns: ["parent_task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      system_settings: {
        Row: {
          created_at: string
          id: string
          setting_key: string
          setting_value: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          setting_key: string
          setting_value: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          setting_key?: string
          setting_value?: string
          updated_at?: string
        }
        Relationships: []
      }
      task_attachments: {
        Row: {
          id: string
          name: string
          storage_path: string | null
          task_id: string
          type: string
          uploaded_at: string
          url: string
        }
        Insert: {
          id?: string
          name: string
          storage_path?: string | null
          task_id: string
          type: string
          uploaded_at?: string
          url: string
        }
        Update: {
          id?: string
          name?: string
          storage_path?: string | null
          task_id?: string
          type?: string
          uploaded_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_attachments_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          assignee_id: string | null
          created_at: string
          description: string | null
          development_hours: number
          due_date: string | null
          id: string
          priority: string
          sprint_id: string | null
          status: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          assignee_id?: string | null
          created_at?: string
          description?: string | null
          development_hours?: number
          due_date?: string | null
          id?: string
          priority: string
          sprint_id?: string | null
          status: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          assignee_id?: string | null
          created_at?: string
          description?: string | null
          development_hours?: number
          due_date?: string | null
          id?: string
          priority?: string
          sprint_id?: string | null
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_assignee_id_fkey"
            columns: ["assignee_id"]
            isOneToOne: false
            referencedRelation: "developers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_sprint_id_fkey"
            columns: ["sprint_id"]
            isOneToOne: false
            referencedRelation: "sprints"
            referencedColumns: ["id"]
          },
        ]
      }
      warming_campaigns: {
        Row: {
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          is_active: boolean | null
          max_interval_minutes: number | null
          messages_per_hour: number | null
          min_interval_minutes: number | null
          name: string
          start_date: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          max_interval_minutes?: number | null
          messages_per_hour?: number | null
          min_interval_minutes?: number | null
          name: string
          start_date?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          max_interval_minutes?: number | null
          messages_per_hour?: number | null
          min_interval_minutes?: number | null
          name?: string
          start_date?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      warming_logs: {
        Row: {
          error_message: string | null
          from_instance: string
          id: string
          message_text: string
          sent_at: string
          status: string
          to_instance: string
        }
        Insert: {
          error_message?: string | null
          from_instance: string
          id?: string
          message_text: string
          sent_at?: string
          status?: string
          to_instance: string
        }
        Update: {
          error_message?: string | null
          from_instance?: string
          id?: string
          message_text?: string
          sent_at?: string
          status?: string
          to_instance?: string
        }
        Relationships: []
      }
      warming_message_logs: {
        Row: {
          error_message: string | null
          from_user_id: string
          id: string
          message_content: string
          sent_at: string
          status: string
          to_user_id: string
        }
        Insert: {
          error_message?: string | null
          from_user_id: string
          id?: string
          message_content: string
          sent_at?: string
          status?: string
          to_user_id: string
        }
        Update: {
          error_message?: string | null
          from_user_id?: string
          id?: string
          message_content?: string
          sent_at?: string
          status?: string
          to_user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "warming_message_logs_from_user_id_fkey"
            columns: ["from_user_id"]
            isOneToOne: false
            referencedRelation: "connected_warming_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "warming_message_logs_to_user_id_fkey"
            columns: ["to_user_id"]
            isOneToOne: false
            referencedRelation: "connected_warming_users"
            referencedColumns: ["id"]
          },
        ]
      }
      warming_messages: {
        Row: {
          campaign_id: string | null
          created_at: string | null
          id: string
          message_text: string
          message_type: string | null
          weight: number | null
        }
        Insert: {
          campaign_id?: string | null
          created_at?: string | null
          id?: string
          message_text: string
          message_type?: string | null
          weight?: number | null
        }
        Update: {
          campaign_id?: string | null
          created_at?: string | null
          id?: string
          message_text?: string
          message_type?: string | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "warming_messages_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "warming_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      warming_settings: {
        Row: {
          auto_start_campaigns: boolean | null
          avoid_weekends: boolean | null
          created_at: string | null
          daily_message_limit: number | null
          id: string
          updated_at: string | null
          use_random_intervals: boolean | null
          user_id: string | null
          working_hours_end: string | null
          working_hours_start: string | null
        }
        Insert: {
          auto_start_campaigns?: boolean | null
          avoid_weekends?: boolean | null
          created_at?: string | null
          daily_message_limit?: number | null
          id?: string
          updated_at?: string | null
          use_random_intervals?: boolean | null
          user_id?: string | null
          working_hours_end?: string | null
          working_hours_start?: string | null
        }
        Update: {
          auto_start_campaigns?: boolean | null
          avoid_weekends?: boolean | null
          created_at?: string | null
          daily_message_limit?: number | null
          id?: string
          updated_at?: string | null
          use_random_intervals?: boolean | null
          user_id?: string | null
          working_hours_end?: string | null
          working_hours_start?: string | null
        }
        Relationships: []
      }
      whatsapp_instances: {
        Row: {
          api_key: string | null
          connection_data: Json | null
          created_at: string | null
          id: string
          instance_name: string
          last_seen: string | null
          owner_jid: string | null
          phone_number: string | null
          qr_code: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
          webhook_url: string | null
        }
        Insert: {
          api_key?: string | null
          connection_data?: Json | null
          created_at?: string | null
          id?: string
          instance_name: string
          last_seen?: string | null
          owner_jid?: string | null
          phone_number?: string | null
          qr_code?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
          webhook_url?: string | null
        }
        Update: {
          api_key?: string | null
          connection_data?: Json | null
          created_at?: string | null
          id?: string
          instance_name?: string
          last_seen?: string | null
          owner_jid?: string | null
          phone_number?: string | null
          qr_code?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
          webhook_url?: string | null
        }
        Relationships: []
      }
      whatsapp_warming_instances: {
        Row: {
          created_at: string
          id: string
          instance_name: string
          qr_code: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          instance_name: string
          qr_code?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          instance_name?: string
          qr_code?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_random_ai_message: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
