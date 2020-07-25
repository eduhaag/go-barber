import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '@modules/appoitments/services/ListProviderMonthAvailabilityService';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { month, year } = request.query;
    const { provider_id } = request.params;

    const providerMonthAvailability = container.resolve(
      ListProviderMonthAvailabilityService,
    );

    const availability = await providerMonthAvailability.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
    });

    return response.json(availability);
  }
}
