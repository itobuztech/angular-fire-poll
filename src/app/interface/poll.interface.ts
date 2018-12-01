export interface Poll {
  id?: string;
  title: string;
  descriptions: string;
  questions: Array<Question>;
}


export interface Question {
  title: string;
  imageurl: string;
  imagepath: string;
}

export interface PollAnswer {
  userid: string;
  pollid: string;
  answer: string;
  answerId: string;
}
