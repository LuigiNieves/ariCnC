import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;
  private bucketName = 'aircnc'; // Reemplaza con el nombre de tu bucket de Supabase
  public URL =
    'https://sbxihfifqidrdzrbrwsm.supabase.co/storage/v1/object/public/';

  constructor() {
    this.supabase = createClient(
      environment.supabaseConfig.url,
      environment.supabaseConfig.secret
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

      console.log(filePath);
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
      console.log(filePath);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error deleting file:', error);
      return { data: null, error };
    }
  }

  async updateFile(
    newFilePath: string,
    newFile: File
  ): Promise<{ data: any; error: any }> {
    try {
      // Primero eliminar el archivo existente
      const { error: deleteError } = await this.deleteFile(newFilePath);
      console.log(newFilePath);
      if (deleteError) {
        console.error('Error removiendo archivo:', deleteError);
        return { data: null, error: deleteError };
      }
      console.log('3');
      // Luego subir el nuevo archivo
      const { data: uploadData, error: uploadError } = await this.uploadFile(
        newFilePath,
        newFile
      );

      if (uploadError) {
        console.error('Error cargando archivo:', uploadError);
        return { data: null, error: uploadError };
      }
      // Retornar datos del archivo subido
      console.log('88');
      return { data: uploadData, error: null };
    } catch (error) {
      console.error('Error actualizando archivo:', error);
      return { data: null, error };
    }
  }

  image(id: any) {
    
    const { data } = this.supabase.storage
      .from(this.bucketName)
      .getPublicUrl(`properties/${id}`);
    return data.publicUrl;
  }

  photo(user: any) {
    const { data } = this.supabase.storage
      .from(this.bucketName)
      .getPublicUrl(`user/${user.idPhoto}`);

    return data.publicUrl;
  }

  // Listar archivos dentro de un bucket
  async listFiles(
    directoryPath: string
  ): Promise<{ files: any[]; error: any }> {
    const { data, error } = await this.supabase.auth.refreshSession();
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
