import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validator, Validators } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";

@Component({
  selector: "app-reactivefrm",
  templateUrl: "./reactivefrm.component.html",
  styleUrls: ["./reactivefrm.component.css"],
})
export class ReactivefrmComponent implements OnInit {
  title = "title";
  mgform: FormGroup;
  table: any;
  constructor(private router: Router, private route: ActivatedRoute) {
    this.mgform = new FormGroup({
      id: new FormControl(""),
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
      ]),
      mobile: new FormControl("", [
        Validators.pattern("^[0-9]{10}"),
        Validators.required,
      ]),
      password: new FormControl("", [Validators.min(6), Validators.required]),
      username: new FormControl("", [Validators.required]),
    });
    this.route.params.subscribe((params) => console.log(params));
  }
  public peditid: any;
  ngOnInit(): void {
    this.table = sessionStorage.getItem("key");
    this.table = JSON.parse(this.table);
   // console.log(this.table);
    let editid = this.route.snapshot.paramMap.get("id");
    this.peditid = editid;
    // console. log(editid)
  let record = this.table.filter((tbl: { id: any }) => {
      return tbl.id == this.peditid;
    });
//console.log(record[0].name)

    this.mgform.patchValue({
      name:record[0].name,
      email:record[0].email,
      mobile:record[0].mobile,
      password:record[0].password,
      username:record[0].username
    })
  }

  issubmit = false;
  onsubmit() {
    this.issubmit = true;
    if (this.mgform.valid) {
      alert("done");
      //mid = Math.random();
      let obj = {
        id: Math.random(),
        name: this.name?.value,
        email: this.email?.value,
        mobile: this.mobile?.value,
        password: this.password?.value,
        username: this.username?.value,
      };
      this.table.push(obj);
      sessionStorage.setItem("key", JSON.stringify(this.table));
      this.router.navigate(["/"]);
    }
  }

  get name() {
    return this.mgform.get("name");
  }
  get email() {
    return this.mgform.get("email");
  }
  get mobile() {
    return this.mgform.get("mobile");
  }
  get password() {
    return this.mgform.get("password");
  }
  get username() {
    return this.mgform.get("username");
  }
}
