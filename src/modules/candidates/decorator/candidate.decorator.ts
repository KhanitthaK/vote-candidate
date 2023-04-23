import { CandidateResponse } from '../dto';

export class CandidateDecorator {
  public static formatCandidateWithRanking(candidate: CandidateResponse, rankings: any) {
    let ranking = rankings?.length + 1;

    rankings?.forEach((value, index) => {
      if (value.candidateId === candidate.id) {
        ranking = index + 1;
      }
    });

    return {
      id: candidate.id,
      name: candidate.name,
      no: candidate.no,
      ranking,
      party: { id: candidate.party?.id, name: candidate.party?.name },
    };
  }
}
