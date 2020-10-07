// Notebooks received from backend
export interface Resource {
  key: string;
  name: string;
  status: string;
  reason: string;
  age: string;
  image: string;
  volumes: string[];
  gpu: string;
  cpu: string;
  memory: string;
}