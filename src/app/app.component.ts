import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor() { }
  input: string = '';
  result: string = '';
  ans: string = '';
  last: boolean = false;
  ngOnInit(): void {
    //this.input='0';
  }
  pressNum(num: string) {
    if (this.last == true) {
      this.input = '';
      this.last = false;
    }
    //Do Not Allow . more than once
    if (num == '.') {
      if (this.input != '') {
        const lastNum = this.getLastOperand();
        console.log(lastNum.lastIndexOf('.'));
        if (lastNum.lastIndexOf('.') >= 0) return;
      }
    }

    //Do Not Allow 0 at beginning.
    //Javascript will throw Octal literals are not allowed in strict mode.
    

    this.input = this.input + num;
    this.calcAnswer();


  }

  getLastOperand() {
    let pos: number;
    console.log(this.input);
    pos = this.input.toString().lastIndexOf('+');
    if (this.input.toString().lastIndexOf('-') > pos)
      pos = this.input.lastIndexOf('-');
    if (this.input.toString().lastIndexOf('*') > pos)
      pos = this.input.lastIndexOf('*');
    if (this.input.toString().lastIndexOf('/') > pos)
      pos = this.input.lastIndexOf('/');
    console.log('Last ' + this.input.substr(pos + 1));
    return this.input.substr(pos + 1);
  }

  pressOperator(op: string) {
    //Do not allow operators more than once
    this.last = false;
    const lastKey = this.input[this.input.length - 1];
    if (
      lastKey === '/' ||
      lastKey === '*' ||
      lastKey === '-' ||
      lastKey === '+'
    ) {
      return;
    }

    this.input = this.input + op;
    this.calcAnswer();
  }

  effacer() {
    if (this.input != '') {
      try {
        this.input = this.input.substr(0, this.input.length - 1);
      } catch (e) {
        this.effacerTout();
      }
    }
  }

  effacerTout() {
    this.result = '';
    this.input = '';
  }

  calcAnswer() {
    let formula = this.input;

    let lastKey = formula[formula.length - 1];

    if (lastKey === '.') {
      formula = formula.substr(0, formula.length - 1);
    }

    lastKey = formula[formula.length - 1];

    if (
      lastKey === '/' ||
      lastKey === '*' ||
      lastKey === '-' ||
      lastKey === '+' ||
      lastKey === '.'
    ) {
      formula = formula.substr(0, formula.length - 1);
    }

    console.log('Formula ' + formula);
    this.result = eval(formula);
    if (this.result=='Infinity'){
      this.result='Math error';
    }
    if (this.result=='NaN'){
      this.result='Math error';
    }
    this.ans = this.result;
  }

  getAnswer() {
    try {
      this.calcAnswer();
      this.input = this.result;
      //document.g('res').textContent=this.input
      if (this.input == '0') this.input = '';
    }
    catch (err) {
      this.input = 'Math error'
    }
    this.last = true;
  }
  getAns(){
    this.input = this.input + this.ans;
  }
}

