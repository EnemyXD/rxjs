import { of, from, timer, range, defer, forkJoin, retry, pluck } from "rxjs";
import axios from "axios";

const request1 = from(
  axios.get("https://api.github.com/search/repositories?q=enemy")
).pipe(retry(3), pluck("data"));

const request2 = from(
  axios.get("https://gitlab.com/api/v4/projects?search=enemy")
).pipe(retry(3), pluck("data"));

forkJoin(request1, request2).subscribe({
  next: (value: any) => {
    console.log(value);
  },
  complete: () => {
    console.log("Complete!");
  },
  error: (error) => {
    console.log("Error!", error);
  },
});
