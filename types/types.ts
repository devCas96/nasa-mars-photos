export interface PhotoList {
  photos: Photo[];
}
export interface Photo {
  id: number;
  sol: number;
  camera: PhotoCamera;
  img_src: string;
  earth_date: Date;
  rover: Rover;
  base64?: string;
}

export interface PhotoCamera {
  id: number;
  name: string;
  rover_id: number;
  full_name: string;
}

export interface Rover {
  id: number;
  name: string;
  landing_date: Date;
  launch_date: Date;
  status: string;
  max_sol: number;
  max_date: Date;
  total_photos: number;
  cameras: CameraElement[];
}

export interface CameraElement {
  name: string;
  full_name: string;
}
