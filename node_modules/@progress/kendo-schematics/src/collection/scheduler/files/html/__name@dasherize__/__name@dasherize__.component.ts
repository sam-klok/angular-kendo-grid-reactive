import { Component } from '@angular/core';
import { sampleData, displayDate } from './events-utc';
import { SchedulerEvent } from '@progress/kendo-angular-scheduler';

@Component({
	selector: '<%= dasherize(name) %>-component',
	templateUrl: './<%= dasherize(name) %>.component.html',
	<% if (inlineStyle) {%> styleUrls: ['./<%= dasherize(name) %>.component.css']<% } else {%>styles: [``]<% } %>
})
export class <%= classify(name) %>Component  {
	public selectedDate: Date = displayDate;
    public events: SchedulerEvent[] = sampleData;
}
