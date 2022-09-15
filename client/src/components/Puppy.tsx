export interface IPuppyProps {
  puppies: {
    breed: string;
    name: string;
    dob: Date;
    size: number;
    img: string
  }
}

export const Puppy = ({puppies: { breed, name, dob, size, img}}: IPuppyProps) => {
  return (
    <div>
      
    </div>
  );
}
