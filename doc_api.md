# GET:
    route : /api/users/
        query params : id,username,offset,limit
            id : Can be the id associated with that user
            username : Can be the username associated with that user
            offset : default=0, number of documents skipped
            limit : default=5, the limit on how many documents you will get
        return : without id or username 
                        {
                            sucess : bool,
                            data:{
                                count:int,
                                users: [
                                            {
                                                username:string,
                                                active:bool,
                                                _id:string
                                            }
                                        ]
                                }
                        }
                 with id or username
                        {
                            sucess:bool,
                            user:{
                                    username:string,
                                    active:bool,
                                    _id:string
                                  }
                        }
        error : {
                    sucess:false,
                    error:string
                }
    
    route : /api/auth/logOut
        return:{
            sucess:bool
        }
        error:{
            sucess:false
        }
# POST:
    route : /api/users/createUser/
        body : username, email, password,
        return:
                {
                    sucess:bool,
                    newUser:{
                        username:string,
                        active:bool,
                        _id:string
                    }
                }
        error:
            {
                sucess:false,
                error:string
            }
    route : /api/auth/
        body : username,password
        return:
                {
                    sucess:bool,
                    user:{
                        username:string,
                        active:bool,
                        _id:string
                    }
                }
        error:
                {
                    sucess:false,
                    error:string
                }

# PUT:
    route : /api/users/
        params : id
        return : 
            {
                sucess:bool,
                oldUser:{
                    username:string,
                    active:bool,
                    _id:string
                }
            }
        error:
            {
                sucess:false,
                error:string
            }

# DELETE:
    route : /api/users/
        params : id
        body: password
        return :
            {
                sucess:bool
            }
        error:
            {
                sucess:false,
                error:string
            }

