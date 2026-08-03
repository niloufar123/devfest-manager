import { httpResource } from "@angular/common/http";
import { Injectable, Signal } from "@angular/core";
import { DevFestEvent } from "../models/event.model";

@Injectable({
  providedIn:'root'
})
export class EventService{
    private apiUrl='http://localhost:3000/events'

    getEventResource(query:Signal<string>){
      return httpResource<DevFestEvent[]>(()=>{
        const q=query();

        return q? `${this.apiUrl}?q=${q}` : this.apiUrl
      })
    }



//     constructor(){
//       this.events.isLoading()
//       this.events.value()
//     }
}