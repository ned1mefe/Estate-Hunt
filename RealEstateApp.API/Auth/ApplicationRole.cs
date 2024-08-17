﻿using Microsoft.AspNetCore.Identity;

namespace RealEstateApp.API.Auth
{
    public class ApplicationRole : IdentityRole
    {
        public ApplicationRole():base() { }
        public ApplicationRole(string roleName) : base(roleName)
        { }
    }
}
