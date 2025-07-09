import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import SocialLogin from '../socialLogin/SocialLogin';
import axios from 'axios';
import useAxios from '../../../hooks/useAxios';


const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosInstance = useAxios();
    const from = location.state?.from || '/';
    const [profilePic, setProfilePic] = useState('');

    const onSubmit = data => {
        console.log(data);
        createUser(data.email, data.password)
            .then(async (result) => {
                console.log(result.user)
                // update userinfo in the database
                const userInfo = {
                    email: data.email,
                    role: 'user', // default role
                    created_at: new Date().toISOString(),
                    last_log_in: new Date().toISOString()
                }

                const userRes = await axiosInstance.post('/users', userInfo);
                console.log(userRes.data);


                // update user profile in firebase
                const userProfile = {
                    displayName: data.name,
                    photoURL: profilePic
                }
                updateUserProfile(userProfile)
                    .then(() => {
                        console.log('profile name pic updated')
                        navigate(from)
                    })
                    .catch(error => {
                        console.log(error)
                    })

            })
            .catch(error => {
                console.error(error);
            })
    }


    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        console.log(image)

        const formData = new FormData();
        formData.append('image', image);


        const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_UPLOAD_KEY}`
        const res = await axios.post(imagUploadUrl, formData)

        setProfilePic(res.data.data.url);
        //console.log(res.data);


    }

    return (

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-5xl font-bold">Create Account</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">
                        {/* name field */}
                        <label className="label">Your Name</label>
                        <input type="text"
                            {...register('name', { required: true })}
                            className="input" placeholder="Your Name" />
                        {
                            errors.name?.type === 'required' && <p className='text-red-500'>Name is required</p>
                        }
                        {/* image field */}
                        <label className="label">Your Image</label>
                        <input type="file"
                            {...register('image', { required: true })}
                            onChange={handleImageUpload}
                            className="input" placeholder="Your Profile picture" />
                        {
                            errors.file?.type === 'required' && <p className='text-red-500'>Image is required</p>
                        }
                        {/* email field */}
                        <label className="label">Email</label>
                        <input type="email"
                            {...register('email', { required: true })}
                            className="input" placeholder="Email" />
                        {
                            errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>
                        }

                        <label className="label">Password</label>
                        <input type="password" {...register('password', { required: true, minLength: 6 })} className="input" placeholder="Password" />
                        {
                            errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
                        }
                        {
                            errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 characters or longer</p>
                        }
                        <button className="btn btn-primary text-black mt-4">Register</button>
                    </fieldset>
                    <p><small>Already have an account? <Link className="btn btn-link" to="/login">Login</Link></small></p>
                </form>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Register;