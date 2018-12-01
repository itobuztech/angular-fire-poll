import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { switchMap, filter } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { PollService  } from '../../services/poll.service';


@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  pollForm: FormGroup;
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
    .subscribe((data: any) => {
      console.log(data);

      const ques: Array<any> = data[0]['questions'];
      ques.forEach(item => {
        this.addItem();
      });
      this.pollForm.patchValue(data[0]);
    });

    this.pollForm.valueChanges.subscribe(res => {
      console.log('poll value', res);
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
