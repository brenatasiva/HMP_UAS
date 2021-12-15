export class UserModel{
    public username: string;
    public nama: string;
    public gender: string;
    public password: string;
    public tanggalLahir: string;
    public email: string;
    public lokasi: string;
    public bio: string;

    constructor(
        username: string, nama: string, gender: string, password: string,
        tanggalLahir: string, email: string, lokasi: string, bio: string){
    }
}
