import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { switchMap, filter } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { PollService  } from '../../services/poll.service';
import { Poll, PollAnswer } from 'src/app/interface/poll.interface';


@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  pollForm: FormGroup;
  answers: PollAnswer[];
  result = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage,
    private pollService: PollService
  ) {
  }

  ngOnInit() {
    this.pollForm = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      descriptions: ['', Validators.required],
      questions: this.formBuilder.array([])
    });

    // edit mode
    this.activatedRoute.params
    .pipe(
      filter(params => params['id']),
      switchMap(params => this.pollService.getById(params.id)))
    .subscribe((data: Poll[]) => {
      console.log(data);

      const ques = data[0].questions;
      ques.forEach(item => {
        this.addItem();
      });
      this.pollForm.patchValue(data[0]);
      this.pollService.getAllAnswerByPollId(data[0].id).subscribe((answerRes: PollAnswer[]) => {
        this.answers = answerRes;
        console.log('answers', this.answers);
        const result = {};
        ques.forEach((item, index) => {
          result[index + 1] = 0;
        });
        answerRes.forEach(answer => {
         result[+answer.answer] = result[+answer.answer] + 1;
        });
        this.result = Object.keys(result).map(item => {
          return {
            q: item,
            count: result[item]
          };
        });
        console.log(this.result)
      });
    });
  }


  createItem(): FormGroup {
    return this.formBuilder.group({
      title: '',
      imageurl: '',
      filepath: ''
    });
  }

  addItem(): void {
   this.questions.push(this.createItem());
  }

  removeItem(i) {
    this.questions.removeAt(i);
  }

  get questions() {
    return this.pollForm.get('questions') as FormArray;
  }

  uploadFile(event, i) {
    const file = event.target.files[0];
    const filePath = 'poll-image' + new Date().getTime();
    const task = this.storage.upload(filePath, file);
    const ref = this.storage.ref(filePath);
    task.then(res => {
      ref.getDownloadURL().subscribe(data => {
        const control = this.questions.at(i);
        control.patchValue({imageurl: data, filepath: filePath});
      });
    });
  }

  submit() {
    this.pollService.createPoll(this.pollForm.value);
    if (!this.pollForm.get('id')) {
      this.pollForm.reset();
      this.questions.controls.forEach((item, i) => {
        this.questions.removeAt(i);
      });
    }
  }
}
