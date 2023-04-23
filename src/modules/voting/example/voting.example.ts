import { candidateExample } from 'src/modules/candidates/examples/candidates.example';
import { userExample } from 'src/modules/users/examples/users.example';

const currentDate = new Date();

export const votingExample = {
  id: 'f0bf8a0e-eac7-4936-b40c-151221a488ec',
  userId: userExample.id,
  candidateId: candidateExample.id,
  districtId: 1,
  createdAt: currentDate,
  updatedAt: currentDate,
  deletedAt: null,
};
