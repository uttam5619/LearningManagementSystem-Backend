const {title, description, category, createdBy}= req.body
    //console.log(title, description, category, createdBy)
    if(!title || !description || !category || !createdBy){
        return res.status(400).json({success: false, message:'provide mandatory details'})
    }
    try{
        const course = await Course.create({
            title,
            description,
            category,
            createdBy,
            thumbnail:{
                public_id: email,
                secure_url: courseImage
            },
        })
        if(!course){
            return res.status(500).json({success: false, message:'failed to create the course'})
        }
        if(req.file){
            const result =await cloudinary.uploader.upload(req.file.path, {
                folder: 'LearningManagementSystem',
                width:250,
                height: 250,
                gravity: 'faces',
                crop: 'fill'
            })
            if(!result){
                return res.status(500).json({success:false, message:'failed to upload thumbnail to cloudinary'})
            }
            course.thumbnail.public_id = result.public_id
            course.thumbnail.secure_url = result.secure_url
            fs.rm(`uploads/${req.file.filename}`)
        }
        await course.save()
        return res.status(201).json({success: true, message:'course successfully created', data:course})
    }catch(err){
        console.log(err.message, err)
    }