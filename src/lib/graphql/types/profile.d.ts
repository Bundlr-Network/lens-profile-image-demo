export interface Profile {
  data: Data;
}

export interface Data {
  profile: ProfileClass;
}

export interface ProfileClass {
  id: string;
  name: string;
  bio: string;
  attributes: Attribute[];
  followNftAddress: string;
  metadata: string;
  isDefault: boolean;
  picture: Picture;
  handle: string;
  coverPicture: Picture;
  ownedBy: string;
  dispatcher: null;
  stats: Stats;
  followModule: null;
  __typename: string;
}

export interface Attribute {
  displayType: string;
  traitType: null;
  key: string;
  value: string;
  __typename: string;
}

export interface Picture {
  original: Original;
  __typename: string;
}

export interface Original {
  url: string;
  mimeType: null;
  __typename: string;
}

export interface Stats {
  totalFollowers: number;
  totalFollowing: number;
  totalPosts: number;
  totalComments: number;
  totalMirrors: number;
  totalPublications: number;
  totalCollects: number;
  __typename: string;
}
