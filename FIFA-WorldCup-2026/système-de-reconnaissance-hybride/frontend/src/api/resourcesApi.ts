import http from '../lib/http';
import { Resource } from '../types';

/**
 * Service de gestion des ressources
 */
class ResourcesService {
    /**
     * Récupérer toutes les ressources
     */
    async getResources(): Promise<Resource[]> {
        const response = await http.get<Resource[]>('/resources');
        return response.data;
    }

    /**
     * Récupérer une ressource par ID
     */
    async getResourceById(id: number): Promise<Resource> {
        const response = await http.get<Resource>(`/resources/${id}`);
        return response.data;
    }
}

export default new ResourcesService();
