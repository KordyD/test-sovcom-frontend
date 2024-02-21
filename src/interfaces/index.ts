export interface Word {
  meta: {
    id: string;
    stems: string[];
  };
  shortdef: string[];
  fl: string;
  hwi: {
    hw: string;
    prs: {
      mw: string;
    }[];
  };
}
