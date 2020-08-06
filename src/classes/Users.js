class User {
  constructor(id, first_name, last_name, phone_number, address) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.phone_number = phone_number;
    this.address = address;
  }

  get Id() {
    return this.id
  }

  get firstName() {
    return this.first_name;
  }

  set firstName(fname) {
    this.first_name = fname;
  }

  get lastName() {
    return this.last_name;
  }

  set lastName(lname) {
    this.last_name = lname;
  }

  get fullName() {
    return `${this.first_name} ${this.last_name}`
  }

  get phoneNumber() {
    return this.phone_number;
  }

  set phoneNumber(number) {
    this.phone_number = number;
  }

  get userAddress() {
    return this.address
  }

  set userAddress(address) {
    this.address = address;
  }
}

export default User
