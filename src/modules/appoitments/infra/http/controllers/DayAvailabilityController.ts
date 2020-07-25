import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appoitments/services/ListProviderDayAvailabilityService';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { day, month, year } = request.query;
    const { provider_id } = request.params;

    const providerDayAvailability = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const availability = await providerDayAvailability.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(availability);
  }
}
