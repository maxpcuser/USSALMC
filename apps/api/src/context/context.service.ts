import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContextService {
  constructor(private prisma: PrismaService) {}

  async createContextRequest(query: string, source?: string, profileId?: number) {
    // Create a new context request
    const request = await this.prisma.contextRequest.create({
      data: {
        query,
        requestSource: source,
        contextProfileId: profileId,
      },
    });

    return request;
  }

  async createContextResponse(requestId: number, payload: any) {
    // Create a new context response
    const response = await this.prisma.contextResponse.create({
      data: {
        requestId,
        contextPayload: payload,
        entityCount: payload.entities?.length || 0,
        documentCount: payload.documents?.length || 0,
        chunkCount: payload.chunks?.length || 0,
        relationshipCount: payload.relationships?.length || 0,
      },
    });

    // Update the request with response ID
    await this.prisma.contextRequest.update({
      where: { id: requestId },
      data: { responseId: response.id },
    });

    return response;
  }
}