import { HttpClient, httpResource } from "@angular/common/http";
import { inject, Injectable, Signal } from "@angular/core";
import { DevFestEvent } from "../models/event.model";

@Injectable({
  providedIn:'root'
})
export class EventService{
    private apiUrl='http://localhost:3000/events'
    private readonly http=inject(HttpClient)

    getEventsResource(query:Signal<string>){
      return httpResource<DevFestEvent[]>(()=>{
        const q=query();

        return q? `${this.apiUrl}?q=${q}` : this.apiUrl
      })
    }

    getEventResource(id:Signal<string>){
      return httpResource<DevFestEvent>(()=>{
        if (!id()) return undefined;

        return `${this.apiUrl}/${id()}`
      })

    }



    deleteEvent(id:string){
        return this.http.delete<void>(`${this.apiUrl}/${id}`)
    }



//     constructor(){
//       this.events.isLoading()
//       this.events.value()
//     }
}