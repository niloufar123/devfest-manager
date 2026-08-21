import { HttpClient } from "@angular/common/http";
import { computed, inject, Injectable, signal } from "@angular/core";
import { TICKET_URL } from "./tokes";

interface TicketEntry{
  id:string;
  eventId:string
}

@Injectable({
  providedIn:'root'
})

export class CartService{
  private readonly http=inject(HttpClient)
  private readonly ticketsUrl=inject(TICKET_URL)

  private readonly ticketIds=signal<string[]>([])

  readonly count=computed(()=>this.ticketIds().length)


  constructor(){
    this.loadTickets()
  }
  private loadTickets(){
    this.http.get<TicketEntry[]>(this.ticketsUrl).subscribe({
      next:(data)=>{
        const ids=data.map(t=>t.eventId)
        this.ticketIds.set(ids)
      }
    })
  }

  addTicket(eventId:string){
    const previousIds=this.ticketIds();
    this.ticketIds.update(ids=>[...ids,eventId])
    this.http.post(this.ticketsUrl,{eventId}).subscribe({
      next:()=>console.log('successful'),
      error:(err)=>{
        console.error('sync failed',eventId);
        this.ticketIds.set(previousIds)
      }

    })

  }


}