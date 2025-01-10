import { Injectable } from '@nestjs/common';

@Injectable()
export class RequestContextService {
  private header: Headers;

  setHeaders(headers: Headers) {
    this.header = headers;
  }

  getHeaders(): Headers {
    return this.header;
  }

  getAuthorization(): string {
    const headers = this.getHeaders();
    // Now you can process the headers, e.g., checking authorization
    const authorizationHeader = headers['authorization'];
    if (authorizationHeader) {
      return authorizationHeader;
    }

    return '';
  }
}
