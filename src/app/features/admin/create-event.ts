import { Component, signal } from '@angular/core';
import { DevFestEvent } from '../../models/event.model';
import { form, FormField, required, minLength, disabled, debounce } from '@angular/forms/signals';
import { FormSubmittedEvent } from '@angular/forms';
interface CreateEventForm extends Omit<DevFestEvent,'id'>{}

@Component({
  selector: 'app-create-event',
  imports: [FormField],
    template: `
    <div class="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
      <h2 class="text-2xl font-bold mb-6 text-gray-800">Create New Event</h2>

      <!-- TODO Mod 4: Bind [group] -->
      <form (submit)="onSubmit($event)" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
          <!-- TODO Mod 4: Bind [control] -->
          <input
        [formField]="form.title"
        type="text"
        class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
        placeholder="e.g. Angular Workshop"
      />
           @if (form.title().touched() && form.title().invalid()) {
      <p class="text-red-500 text-sm mt-1">{{ form.title().errors()[0].message }}</p>
      }
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input type="datetime-local" class="w-full px-4 py-2 border rounded-md" />
        </div>

        <!-- TODO Mod 4: Dynamic Speaker Array -->

        <!-- Description -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
      <textarea
        [formField]="form.description"
        rows="3"
        class="w-full px-4 py-2 border rounded-md outline-none"
      ></textarea>

      @if (form.description().touched() && form.description().invalid()) {
      <p class="text-red-500 text-sm mt-1">{{ form.description().errors()[0].message }}</p>
      }
    </div>

    <!-- Date & Location -->
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label>Date</label>
        <input
          [formField]="form.date"
          type="datetime-local"
          class="w-full px-4 py-2 border rounded-md"
        />
      </div>
      <div>
        <label>Location</label>
        <input [formField]="form.location" type="text" class="w-full px-4 py-2 border rounded-md" />
      </div>
    </div>

    <!-- (Speakers Array Next) -->

    <!-- Actions -->
    <div class="flex justify-end gap-4 pt-4">
      <button type="button" class="px-4 py-2 text-gray-600">Cancel</button>

      <!-- Form-Level Validity: form().invalid() -->
      <button
        type="submit"
        [disabled]="form().invalid()"
        class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        Create Event
      </button>
    </div>
  </form>
</div>
  `,
})
export class CreateEvent {
  // TODO Mod 4: form = form(...)
  readonly eventData=signal<CreateEventForm>({
    title:'',
    description:'',
    date:new Date().toISOString().slice(0,16),
    location:'',
    speakers:[],
    image:'/image/event4.png'
  })

  readonly form=form(this.eventData,(root)=>{
    required(root.title,{message:'title is required'});
    debounce(root.description,1000)
    disabled(root.description,({valueOf})=>!valueOf(root.title))
    required(root.description,{message:'description is required'})

    minLength(root.description,10,{message:'Description must be at least 10 characters'})
    required(root.date,{message:'Date is required'})
    required(root.location,{message:'Location is required'})


  })
  onSubmit(event:SubmitEvent){



  }


}
