import React from 'react';
import { useNavigate } from 'react-router';

export default function About() {
  const x = useNavigate();
  console.log(x);

  return <div>this is about page</div>;
}
