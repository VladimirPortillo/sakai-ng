export interface Login {
    usuario:    string;
    contrasena: string;
}

export interface LoginResponse {
    ok:    boolean;
    iud:   number;
    name:  string;
    token: string;
}