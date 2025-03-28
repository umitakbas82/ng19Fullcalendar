import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions,EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import trLocale from '@fullcalendar/core/locales/tr'
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-calendar',
  imports: [CommonModule,FullCalendarModule,],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {

  loading = true;
  error: string | null = null;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin,interactionPlugin],
    locale: trLocale,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay,dayGridYear'
    },
    events: []
  };


  events:any=[]
  constructor(private services:DataService){}
  
  
  
  ngOnInit(): void {
    this.getEvents();
  }

  getEvents() {

    this.loading = true;
    this.error = null;
    
    this.services.getEventData().subscribe({
      next: (resp) => {
        // FullCalendar'ın beklediği formata dönüştür
        const formattedEvents: EventInput[] = resp.map(event => ({
          id: event.id.toString(),
          title: event.title,
          start: event.start,
          end: event.end || undefined,
          color: event.color || 'blue',
          description: event.description || ''
        }));

        console.log('Formatlanmış eventler:', formattedEvents);

        // Mevcut calendarOptions'a events ekle
        this.calendarOptions = {
          ...this.calendarOptions,
          events: formattedEvents
        };
        this.loading = false;
        console.log(resp)
      },
      error: (err) => {
        console.error('Etkinlikler yüklenirken hata oluştu:', err);
        this.error = 'Etkinlikler yüklenemedi';
        this.loading = false;
      }
    });
  }
}

   
  




