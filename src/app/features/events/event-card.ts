import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'app-event-card',
  imports:[DatePipe,CurrencyPipe],
  template: `
    <div
      class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div class="relative h-48 w-full bg-gray-200">
        <img
          [src]="image()"
          class="object-cover w-full h-full max-h-full max-w-full"
          alt="Event thumbnail"
        />
      </div>

      <div class="p-6">
        <div class="flex justify-between items-center mt-4">

          <!-- TODO Mod 1: Add Date using DatePipe -->

          <p class="text-sm text-blue-600 font-semibold mb-2">

          {{(date() | date:'mediumDate')|| 'TBA'}}
          {{salary |currency }}

          </p>
          @let days = dayUntil();
          @if (days != null) {
            <div
              class="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm"
            >
              @if (days > 0) {
                In {{ days }} Days
              } @else if (days < 0) {
                past event
              } @else {
                Happening Now
              }
            </div>
          }
        </div>

        <h3 class="text-xl font-bold text-gray-800 my-2">{{ title() }}</h3>
        <h3 class="text-xl font-bold text-gray-800 my-2">Title Placeholder</h3>

        <div class="flex justify-between items-center mt-4">
          <!-- TODO Mod 1: Add Derived State (Like Button) -->
          <button
          (click)="toggleFavorite()"
           [class.text-red-500]='isFavorite()'>
            {{ isFavorite() ? '❤' : '♡' }} Like
          </button>

          <!-- TODO Mod 1: Add Output -->
          <button
          class="text-gray-400 text-sm hover:text-gray-600 cursor-pointer"
          (click)="removeEvent()"
          >Remove</button>
        </div>

        <div class="mt-4 pt-4 border-t border-gray-100 text-right">
          <a class="text-blue-600 font-medium hover:underline cursor-pointer"> View Details → </a>
        </div>
      </div>
    </div>
  `,
})
export class EventCard {
  // TODO Mod 1: Implement input(), output(), and model()
  title = input.required<string>();
  image = input.required<string>();
  date = input<string>();
  initialLiked=input(false)
  delete=output<void>()
  isFavorite=linkedSignal(()=>this.initialLiked())

  salary='5000.3'

  ngOnInit() {
    console.log(this.dayUntil(), this.date());
  }

  dayUntil = computed(() => {
    const eventdate = this.date();
    if (!eventdate) return null;
    const today = new Date();
    const target = new Date(eventdate);

    const diff = today.getTime() - target.getTime();
    const days = Math.ceil(diff / (60 * 60 * 1000 * 24));
    return days;
  });

  toggleFavorite(){
    this.isFavorite.update((val)=>!val)
  }
  removeEvent(){
    this.delete.emit()
  }
}
