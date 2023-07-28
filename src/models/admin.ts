import { PostAdmin, GetAdmin } from '../../src/types/admin';

export const createAdmin = async (newAdminInfo: PostAdmin): Promise<string> => {
  const { name } = newAdminInfo;
  return name;
};

export const getAdmin = async (): Promise<Array<GetAdmin>> => {
  return [{ name: 'admin_1' }, { name: 'admin_2' }, { name: 'admin_3' }];
};
