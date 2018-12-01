export interface Poll {
  id?: string;
  title: string;
  descriptions: string;
  questions: Array<Question>;
}


export interface Question {
  title: string;
  imageUrl: string;
  imagepath: string;
}
