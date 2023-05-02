const Roles = {
  public: 'public',
  manufacturer: 'manufacturer',
  distributor: 'distributor',
  pharmacy: 'pharmacy',
};

export interface RoleTypes {
  manufacturer: string;
  distributor: string;
  pharmacy: string;
}

export const bytes32Roles: RoleTypes = {
  manufacturer:
    '0x6659d833875b88922d2576dad6c137a09ba676496bb2010bf8a72397792167a0',
  distributor:
    '0x223ac70e28f5d4897c9100d90cdb122ce166e2cf80f3f467f085a3921ff7c03c',
  pharmacy:
    '0x6d960d3aada907633a701143a0c8a0657b9ed1e77b6d2d8b56e5d8813982e10c',
};

export const rolesToByte32: { [key: string]: keyof RoleTypes } = {
  '0x6659d833875b88922d2576dad6c137a09ba676496bb2010bf8a72397792167a0':
    'manufacturer',

  '0x223ac70e28f5d4897c9100d90cdb122ce166e2cf80f3f467f085a3921ff7c03c':
    'distributor',

  '0x6d960d3aada907633a701143a0c8a0657b9ed1e77b6d2d8b56e5d8813982e10c':
    'pharmacy',
};

export default Roles;
