export default class User
{
    Id: string;
    Name: string;   
    Description: string;
    Avatar: string;
    Status: Number;
    
    constructor(id: string, Name: string, Description: string, Avatar: string, Status: Number) {
        this.Id = id;
        this.Name = Name;
        this.Description = Description;
        this.Avatar = Avatar;
        this.Status = Status;
    }
}

