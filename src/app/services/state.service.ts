import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  testString: WritableSignal<string> = signal('username');

  updateTestString(newString: string): void {
    this.testString.set(newString);
  }
}