import { Prisma, PrismaClient } from '@prisma/client';
import { candidateInfo, provinces, users } from './seeds';

const prisma = new PrismaClient();

type CandidateInfo = {
  candidateNameTh: string;
  candidateNumber: number;
  districtNumber: number;
  partyNameTh: string;
  provinceNameTh: string;
}

async function seedProvinces(data: Prisma.ProvinceCreateManyInput[]) {
  return prisma.province.createMany({
    data,
    skipDuplicates: true,
  });
}

async function seedUsers(data: Prisma.UserCreateManyInput[]) {
  return prisma.user.createMany({
    data,
    skipDuplicates: true,
  });
}

async function seedDistricts(data: Prisma.DistrictCreateManyInput[]) {
  return prisma.district.createMany({
    data,
    skipDuplicates: true,
  });
}

async function seedParties(data: Prisma.PartyCreateManyInput[]) {
  return prisma.party.createMany({
    data,
    skipDuplicates: true,
  });
}

async function seedCandidates(data: Prisma.CandidateCreateManyInput[]) {
  return prisma.candidate.createMany({
    data,
    skipDuplicates: true,
  });
}

async function getDistrictInfo(data: CandidateInfo[]): Promise<Prisma.DistrictCreateManyInput[]> {
  const districtsMapping = new Map();

    await Promise.all(data.map( ({provinceNameTh, districtNumber}) => {
      districtsMapping.set(`${districtNumber}${provinceNameTh}`, { provinceNameTh, districtNumber });
    }));

    const districts = [];

    districtsMapping.forEach(({ provinceNameTh, districtNumber }) => {
      const provinceId = provinces.find(province => province.nameTh === provinceNameTh).id;

      districts.push({
        provinceId,
        districtNumber,
      });
    });

    return districts
}

async function getPartyInfo(data: CandidateInfo[]): Promise<Prisma.PartyCreateManyInput[]> {
  const partyMapping = new Map();

  await Promise.all( data.map( ({ partyNameTh }) => {
      partyMapping.set(`${partyNameTh}`, { partyNameTh });
    }));

    const parties = [];

    partyMapping.forEach(({ partyNameTh: name }) => {
      parties.push({
        name,
      });
    });

    return parties;
}

async function main() {
  try {
    await seedProvinces(provinces);

    const districts = await getDistrictInfo(candidateInfo);
    const parties = await getPartyInfo(candidateInfo);
    const districtInfo = await prisma.district.findMany({
      include: {
        province: true,
      }
    });

    const partyInfo = await prisma.party.findMany();

    await seedDistricts(districts);
    await seedParties(parties);

    const candidates: Prisma.CandidateCreateManyInput[] = candidateInfo.map( candidate => {
      return {
        name: candidate.candidateNameTh,
        districtId: districtInfo.find( district => district.province.nameTh === candidate.provinceNameTh ).id,
        partyId: partyInfo.find( party => party.name === candidate.partyNameTh ).id,
        no: candidate.candidateNumber,
      }
    });

    await seedCandidates(candidates);
    await seedUsers(users);
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    async () => {
      await prisma.$disconnect();
    };
  }
}

main();
