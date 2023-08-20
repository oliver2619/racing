export interface ParcourElementJson {

    length: number;
    
    curve?: {
        speed: number;
        turn: 'l' | 'r';
    }

}