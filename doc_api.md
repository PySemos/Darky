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