// import axios from "axios"

// export default class ApiService{

//     static BASE_URL = "http://localhost:8080"

//     static getHeader(){
//         const token = localStorage.getItem("token");
//         return{
//             Authorization:`Bearer ${token}`,
//             "content-Type":"application/json"

//         };
//     }

// //user
// // This register a new User
//     static async registerUser(regitration){
//         const respone = await axios.post(`${this.BASE_URL}/auth/register`,regitration)
//         return respone.data
//     }

//     static async loginUser(loginDetails){
//         const respone = await axios.post(`${this.BASE_URL}/auth/login`,loginDetails)
//         return respone.data
//     }
// // this is to get the userProfile
//      static async getAllUsers(){
//         const respone = await axios.get(`${this.BASE_URL}/users/all`,{
//             headers:this.getHeader()
//         })
//         return respone.data
//     }
// //
//      static async getUserProfile(loginDetails){
//         const respone = await axios.get(`${this.BASE_URL}/users/get-logged-in-profile-info`,{
//             headers: this.getHeader()
//         })
//         return respone.data
//     }

//     static async getUser(userId){
//         const respone = await axios.get(`${this.BASE_URL}/users/get-by-id${userId}`,{
//             headers:this.getHeader()
//         })
//         return respone.data
//     }

//     static async getUserBooking(userId){
//         const respone = await axios.get(`${this.BASE_URL}/users/get-user-bookings/${userId}`,{
//             headers:this.getHeader()
//         })
//         return respone.data
//     }

//      static async deleteUser (userId){
//         const respone = await axios.delete(`${this.BASE_URL}/users/delete/${userId}`,{
//             headers:this.getHeader()
//         })
//         return respone.data
//     }

//     //Room

//      static async addRoom(formDate){
//         const result = await axios.post(`${this.BASE_URL}/rooms/add`,{
//             headers:{
//                 ...this.getHeader(),
//                 'content-Type':'multipart/form-data'
//             }
//         });
//         return result.data
//     }


//     static async getAllAvailableRooms(){
//         const result = await axios.get(`${this.BASE_URL}/rooms/all-available-rooms`)
//         return result.data
//     }

//     static async getAvailableRoomsByDateAndType(checkInDate,checkOutDate,roomType){
//         const result = await axios.get(`${this.BASE_URL}/rooms/available-rooms-by-date-and-type?checkInDate=${checkInDate}
//             &checkOutDate=${checkOutDate}&roomType=${roomType}`)

//     return result.data
//     }

//      static async getRoomTypes(){
//         const respone = await axios.get(`${this.BASE_URL}/rooms/types`)
//         return respone.data
//     }

//      static async getAllRoom(){
//         const result = await axios.get(`${this.BASE_URL}/rooms/all`)
//         return result.data
//     }

//      static async getRoomById(roomId){
//         const result = await axios.get(`${this.BASE_URL}/rooms/room-by-id/${roomId}`)
//         return result.data
//     }

    
//      static async deleteRoom(roomId){
//         const result = await axios.delete(`${this.BASE_URL}/rooms/delete/${roomId}`,{
//             headers: this.getHeader()
//         })
//         return result.data
//     }

//      static async updateRoom(roomId,formDate){
//         const result = await axios.put(`${this.BASE_URL}/rooms/delete/${roomId}`,formDate ,{
//             headers: {
//                 ...this.getHeader(),
//                 'Content-Type':'multifile/form-data'
//             }
//         });

//         return result.data
//     }

//     //Booking


//      static async bookRoom(roomId,userId,booking){

//         console.log("USER ID IS:"+userId)

//         const respone = await axios.post(`${this.BASE_URL}/bookings/book-room/${roomId}/${userId}`,booking ,{
//             headers:this.getHeader()
             
//         });
        
//         return respone.data
//     }


//      static async getAllBookings(){
//         const result = await axios.get(`${this.BASE_URL}/bookings/all` ,{
//             headers:this.getHeader()
             
//         });
        
//         return result.data
//     }

//      static async getBookingByConfirmationCode(bookingCode){
//         const result = await axios.get(`${this.BASE_URL}/bookings/get-by-confirmation-code/${bookingCode}`)
        
//         return result.data
//     }

//     static async cancelBooking(bookingId){
//         const result = await axios.get(`${this.BASE_URL}/bookings/cancel/${bookingId}`,{
//             headers:this.getHeader()
//         })
        
//         return result.data
//     }

//     static lagout(){
//         localStorage.removeItem('token')
//         localStorage.removeItem('role')
//     }

//     static isAuthenticated(){
//         const token = localStorage.getItem('token')
//         return !!token
//     }

//     static isAdmin(){
//         const role = localStorage.getItem('role')
//         return role === "ADMIN"
//     }

//     static isUser(){
//         const role = localStorage.getItem('role')
//         return role === "USER"
//     }




// }

import axios from "axios";

export default class ApiService {
    
    static BASE_URL = "http://localhost:8080";

    static getHeader() {
        const token = localStorage.getItem("token");
        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };
    }

    // ---------------- USER ----------------

    static async registerUser(registration) {
        const response = await axios.post(
            `${this.BASE_URL}/auth/register`,
            registration
        );
        return response.data;
    }

    static async loginUser(loginDetails) {
        const response = await axios.post(
            `${this.BASE_URL}/auth/login`,
            loginDetails
        );
        return response.data;
    }

    static async getAllUsers() {
        const response = await axios.get(
            `${this.BASE_URL}/users/all`,
            { headers: this.getHeader() }
        );
        return response.data;
    }

    static async getUserProfile() {
        const response = await axios.get(
            `${this.BASE_URL}/users/get-logged-in-profile-info`,
            { headers: this.getHeader() }
        );
        return response.data;
    }

    static async getUser(userId) {
        const response = await axios.get(
            `${this.BASE_URL}/users/get-by-id/${userId}`,
            { headers: this.getHeader() }
        );
        return response.data;
    }

    static async getUserBooking(userId) {
        const response = await axios.get(
            `${this.BASE_URL}/users/get-user-bookings/${userId}`,
            { headers: this.getHeader() }
        );
        return response.data;
    }

    static async deleteUser(userId) {
        const response = await axios.delete(
            `${this.BASE_URL}/users/delete/${userId}`,
            { headers: this.getHeader() }
        );
        return response.data;
    }

    // ---------------- ROOMS ----------------

    static async addRoom(formData) {
        const result = await axios.post(
            `${this.BASE_URL}/rooms/add`,
            formData,
            {
                headers: {
                    ...this.getHeader(),
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return result.data;
    }

    static async getAllAvailableRooms() {
        const result = await axios.get(`${this.BASE_URL}/rooms/all-available-rooms`);
        return result.data;
    }

    static async getAvailableRoomsByDateAndType(checkInDate, checkOutDate, roomType) {
        const url = `${this.BASE_URL}/rooms/available-rooms-by-date-and-type?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`;
        const result = await axios.get(url);
        return result.data;
    }

    static async getRoomTypes() {
        const response = await axios.get(`${this.BASE_URL}/rooms/types`);
        return response.data;
    }

    static async getAllRoom() {
        const result = await axios.get(`${this.BASE_URL}/rooms/all`);
        return result.data;
    }

    static async getRoomById(roomId) {
        const result = await axios.get(`${this.BASE_URL}/rooms/room-by-id/${roomId}`);
        return result.data;
    }

    static async deleteRoom(roomId) {
        const result = await axios.delete(
            `${this.BASE_URL}/rooms/delete/${roomId}`,
            { headers: this.getHeader() }
        );
        return result.data;
    }

    static async updateRoom(roomId, formData) {
        const result = await axios.put(
            `${this.BASE_URL}/rooms/update/${roomId}`,
            formData,
            {
                headers: {
                    ...this.getHeader(),
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return result.data;
    }

    // ---------------- BOOKING ----------------

    static async bookRoom(roomId, userId, booking) {
        const response = await axios.post(
            `${this.BASE_URL}/bookings/book-room/${roomId}/${userId}`,
            booking,
            {
                headers: this.getHeader(),
            }
        );
        return response.data;
    }

    static async getAllBookings() {
        const result = await axios.get(`${this.BASE_URL}/bookings/all`, {
            headers: this.getHeader(),
        });
        return result.data;
    }

    static async getBookingByConfirmationCode(bookingCode) {
    const result = await axios.get(
        `${this.BASE_URL}/bookings/get-by-confirmation-Code/${bookingCode}`,
        { headers: this.getHeader() }
    );
    return result.data;
}


    static async cancelBooking(bookingId) {
        const result = await axios.delete(
            `${this.BASE_URL}/bookings/cancel/${bookingId}`,
            { headers: this.getHeader() }
        );
        return result.data;
    }

    // ---------------- AUTH ----------------

    static logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
    }

    static isAuthenticated() {
        return !!localStorage.getItem("token");
    }

    static isAdmin() {
        return localStorage.getItem("role") === "ADMIN";
    }

    static isUser() {
        return localStorage.getItem("role") === "USER";
    }
}
