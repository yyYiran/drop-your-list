export interface results {
  totalItems: number;
  items: Array<result>;
}

export interface result {
  volumeInfo: volumeInfo;
}

export interface volumeInfo {
  title: string;
  authors: Array<String>;
  industryIdentifiers: Array<isbnInfo>;
  imageLinks: imgLink;
}

export interface isbnInfo {
  identifier: string;
}

export interface imgLink {
  thumbnail: string;
}
