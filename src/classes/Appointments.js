class Appointment {
  constructor(id, user_id, scheduled_date, confirmed=false) {
    this.id = id;
    this.user_id = user_id;
    this.scheduled_date = scheduled_date;
    this.confirmed = confirmed;
  }

  get appointmentId() {
    return this.id;
  }

  get userID() {
    return this.user_id;
  }

  get scheduledDate() {
    return this.scheduled_date;
  }
  set scheduledDate(date) {
    this.scheduled_date = date;
  }

  get isConfirmed() {
    return this.confirmed;
  }

  isConfirmed() {
    this.confirmed ? false : true;
  }
}

export class EstimateAppointment extends Appointment {
  constructor(id, user_id, scheduled_date, confirmed) {
    super(id, user_id, scheduled_date, confirmed);
  }
}

export class WorkingAppointment extends Appointment {
  constructor(id, estimate_id, user_id, scheduled_date, confirmed) {
    super(id, user_id, scheduled_date, confirmed);
    this.estimate_id = estimate_id;
  }

  get estimateId() {
    return this.estimate_id;
  }
}
