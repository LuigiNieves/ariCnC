import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;
  private bucketName = 'aircnc'; // Reemplaza con el nombre de tu bucket de Supabase
  public URL = 'https://sbxihfifqidrdzrbrwsm.supabase.co/storage/v1/object/public/'

  constructor() {
    this.supabase = createClient(
      'https://sbxihfifqidrdzrbrwsm.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNieGloZmlmcWlkcmR6cmJyd3NtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNzU4MjE3NiwiZXhwIjoyMDQzMTU4MTc2fQ.bTdDyrJIK0WzjfmWAu2DYYA0WFImr6En6YrwSTXiGRA'
    );
  }

  // Subir un archivo al almacenamiento de Supabase
  async uploadFile(
    filePath: string,
    file: File
  ): Promise<{ data: any; error: any }> {
    try {
      const { data, error } = await this.supabase.storage
        .from(this.bucketName)
        .upload(filePath, file);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error uploading file:', error);
      return { data: null, error };
    }
  }

  // Descargar un archivo desde el almacenamiento de Supabase
  async downloadFile(
    filePath: string
  ): Promise<{ fileUrl: string | null; error: any }> {
    try {
      const { data } = this.supabase.storage
        .from(this.bucketName)
        .getPublicUrl(filePath);

      return { fileUrl: data?.publicUrl || null, error: null };
    } catch (error) {
      console.error('Error downloading file:', error);
      return { fileUrl: null, error };
    }
  }

  // Eliminar un archivo del almacenamiento de Supabase
  async deleteFile(filePath: string): Promise<{ data: any; error: any }> {
    try {
      const { data, error } = await this.supabase.storage
        .from(this.bucketName)
        .remove([filePath]);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error deleting file:', error);
      return { data: null, error };
    }
  }

  // Listar archivos dentro de un bucket
  async listFiles(
    directoryPath: string
  ): Promise<{ files: any[]; error: any }> {
    try {
      const { data, error } = await this.supabase.storage
        .from(this.bucketName)
        .list(directoryPath);

      if (error) throw error;
      return { files: data || [], error: null };
    } catch (error) {
      console.error('Error listing files:', error);
      return { files: [], error };
    }
  }
}
