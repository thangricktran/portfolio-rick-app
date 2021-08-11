import { useState, useEffect } from 'react';
import { Controller, useForm } from "react-hook-form";
import ReactDatePicker from "react-datepicker";

const setInitialDataDates = (initialData) => {
 if (initialData.startDate) {
    initialData = {
      ...initialData,
      startDate: new Date(initialData.startDate)
    }
  }
  if (initialData.endDate) {
    initialData = {
      ...initialData,
      endDate: new Date(initialData.endDate)
    }
  }
  return {...initialData};
};

const PortfolioForm = ({ onSubmit, buttonLabel='Create', initialData = {} }) => {
  // console.log("initialData: \n", initialData);
 
  const { control, register, handleSubmit, setValue, getValues, 
    formState: {errors} } = useForm({defaultValues: setInitialDataDates(initialData)});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateChange = (dateType, setDate) => date => {
    console.log("handleDateChange had been invoked, date: \n", date);
    setValue(dateType, date);
    setDate(date);
  };

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>

      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          {...register("title", { required: true })}
          name="title"
          type="text"
          className="form-control"
          id="title"/>
        {errors.title && <span style={{color: 'red'}}>This field is required</span>}
      </div>

      <div className="form-group">
        <label htmlFor="company">Company</label>
        <input
          {...register("company", { required: true })}
          name="company"
          type="text"
          className="form-control"
          id="company"/>
        {errors.company && <span style={{color: 'red'}}>This field is required</span>}
      </div>

      <div className="form-group">
        <label htmlFor="companyWebsite">Company Website</label>
        <input
          {...register("companyWebsite", { required: true })}
          name="companyWebsite"
          type="text"
          className="form-control"
          id="companyWebsite"/>
        {errors.companyWebsite && <span style={{color: 'red'}}>This field is required</span>}
      </div>

      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input
          {...register("location", { required: true })}
          name="location"
          type="text"
          className="form-control"
          id="location"/>
        {errors.location && <span style={{color: 'red'}}>This field is required</span>}
      </div>

      <div className="form-group">
        <label htmlFor="jobTitle">Job Title</label>
        <input
          {...register("jobTitle", { required: true })}
          name="jobTitle"
          type="text"
          className="form-control"
          id="jobTitle"/>
        {errors.jobTitle && <span style={{color: 'red'}}>This field is required</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          {...register("description", { required: true })}
          name="description"
          rows="5"
          type="text"
          className="form-control"
          id="description">
        </textarea>
        {errors.description && <span style={{color: 'red'}}>This field is required</span>}
      </div>
 
      <div className="form-group">
        <label htmlFor="startDate">Start Date</label>
        <div>
          <Controller
            control={control}
            name="startDate"
            defaultValue={null}
            rules={{required: true}}
            render={({ field }) => (
              <ReactDatePicker
                showYearDropdown                
                placeholderText='Select starting date'
                onChange={(date) => {field.onChange(date),handleDateChange('startDate', setStartDate)(date)}}
                selected={field.value}
              />
            )}
          />
        </div>
        {errors.startDate && <span style={{color: 'red'}}>Start date is required</span>}
      </div>
      <div className="form-group">
        <label htmlFor="endDate">End Date</label>
        <div>
          <Controller
            control={control}
            name="endDate"
            defaultValue={null}
            rules={{required: false}}
            render={({ field }) => (
              <ReactDatePicker
                disabled={!endDate}
                showYearDropdown                
                placeholderText='Select ending date'
                onChange={(date) => {field.onChange(date), handleDateChange('endDate', setEndDate)(date)}}
                selected={field.value}
              />
            )}
          />
        </div>
      </div>
      <div className="form-group">
      { endDate &&
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => handleDateChange('endDate', setEndDate)(null)}
        >
          No End Date
        </button>
      }
      { !endDate &&
        <button
          type="button"
          className="btn btn-success"
          onClick={() => handleDateChange('endDate', setEndDate)(new Date(new Date().setHours(0,0,0,0)))}
        >
          Set End Date
        </button>
      }  
      </div>
      <button
        type="submit"
        className="btn btn-primary">{buttonLabel ? buttonLabel:'Create'}
      </button>
    </form>
  );
}

export default PortfolioForm;
