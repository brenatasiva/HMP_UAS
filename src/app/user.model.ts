export class UserModel {
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
        tanggalLahir: string, email: string, lokasi: string, bio: string) {
        this.username = username;
        this.nama = nama;
        this.gender = gender;
        this.password = password;
        this.tanggalLahir = tanggalLahir;
        this.email = email;
        this.lokasi = lokasi;
        this.bio = bio;
    }
}
