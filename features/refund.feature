Feature: Event Booking with Single Ticket

Scenario: Book One Ticket and Valid the booking is eligible for Refund
Given Login with valid user "prince.gupta@gmail.com" and "Prince@123"
When User book an event with one ticket
Then User is able its booking in Booking section
Then User is able to check if the booking is eleigible for a refund 